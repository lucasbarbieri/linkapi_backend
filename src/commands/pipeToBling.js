const env = require("dotenv").config();
const Opportunities = require("../app/Models/Opportunities");
const moment = require("moment");
const utf8 = require("utf8");
const countResponse = { error: 0, success: 0, database: 0 };

const pipeDriveGetDeals = async () => {
  const pipeDriveInterceptor = new (require("../services/apiInterceptor"))(
    process.env.PIPEDRIVE_URL_BASE,
    {}
  );
  const pipeDriveConfig = { userId: 1, filterId: 2 };

  const response = await pipeDriveInterceptor.get(
    `deals?user_id=${pipeDriveConfig.userId}&filter_id=${pipeDriveConfig.filterId}&status=all_not_deleted&api_token=${process.env.PIPEDRIVE_TOKEN}`
  );

  if (response.status === 200) {
    return response.data;
  } else {
    return false;
  }
};

const postBling = async (xml, nfe = false) => {
  const blingInterceptor = new (require("../services/apiInterceptor"))(
    process.env.BLING_URL_BASE,
    {}
  );

  return await blingInterceptor.post(
    `pedido/json/?apikey=${process.env.BLING_API_KEY}&xml=${xml}`
  );
};

const createOpportunity = async data => {
  try {
    await Opportunities.create({
      created_at: data.won_time,
      total: parseFloat(data.value)
    });
    countResponse.database++;
    return true;
  } catch (e) {
    console.log("Error to save in databae => ", e);
    return false;
  }
};

const createBlingXML = async opportunity => {
  let xml = `<?xml version="1.0" encoding="UTF-8"?>
    <raiz>
        <pedido>
          <data>${moment(opportunity.won_time).format("DD/MM/YYYY")}</data>
          <data_prevista>${moment(opportunity.first_won_time).format(
            "DD/MM/YYYY"
          )}</data_prevista>
          <numero>${opportunity.pipeline_id}</numero>
          <cliente>
            <nome>${
              opportunity.person_name
                ? opportunity.person_name
                : "Nao Informado"
            }</nome>
          </cliente>
          <itens>
            <item>
              <codigo>${opportunity.pipeline_id}</codigo>
              <descricao>${
                opportunity.title ? opportunity.title : "Nao Definido"
              }</descricao>
              <qtde>${1}</qtde>
              <vlr_unit>${parseFloat(opportunity.value)}</vlr_unit>
            </item>
          </itens>
          <parcelas>
            <parcela>
              <nrodias>${10}</nrodias>
              <vlr>${parseFloat(opportunity.value)}</vlr>
            </parcela>
          </parcelas>
      </pedido>
    </raiz>`;

  xml = xml.replace(/>\s*/g, ">");
  xml = xml.replace(/\s*</g, "<");

  return utf8.encode(xml);
};

const run = async () => {
  try {
    console.log("Process started, please wait...");
    const opportunities = await pipeDriveGetDeals();

    for (let oportunity of opportunities.data) {
      const xml = await createBlingXML(oportunity);
      const post = await postBling(xml);

      if (post.status === 201) {
        await createOpportunity(oportunity);
        countResponse.success++;
      } else {
        countResponse.error++;
      }
    }
    console.log(
      `Finished without errors. Total Success: ${countResponse.success} | Database: ${countResponse.database} | Errors: ${countResponse.error}`
    );
    process.exit();
  } catch (e) {
    console.log("Unexpected error", e);
    process.exit();
  }
};

run();
