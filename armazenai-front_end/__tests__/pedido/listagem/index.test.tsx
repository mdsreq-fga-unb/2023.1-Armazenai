import axios from "axios";

describe("Teste da API de pedido no supabase", () => {
  let token: string | undefined;
  let idToDelete: number | undefined;
  const pedidoMock = {};

  beforeAll(() => {
    axios.interceptors.request.use((config) => {
      config.headers["apikey"] =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx5bmlpd2R2c2Zwc2JleHJrb25zIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODUwMjU3ODEsImV4cCI6MjAwMDYwMTc4MX0.YYdZlKJKT4Njbfg0k-a7YEg890f7ulZpCNqndDDf9Uk";
      config.headers["Prefer"] = "return=representation";
      config.headers["Content-Type"] = "application/json";
      config.baseURL = "https://lyniiwdvsfpsbexrkons.supabase.co/";
      return config;
    });
  });

  beforeEach(async () => {
    await axios
      .post("auth/v1/token?grant_type=password", {
        email: "kaioenzobr@gmail.com",
        password: "123321",
      })
      .then((d) => {
        token = d.data.access_token;
      });
    axios.interceptors.request.use((config) => {
      config.headers["Authorization"] = `Bearer ${token}`;
      return config;
    });
  });

  afterEach(async () => {
    if (idToDelete) {
      const retorno = await axios.delete(
        `rest/v1/propriedade?id=eq.${idToDelete}`
      );
      expect(retorno.status).toBe(200);
      idToDelete = undefined;
    }
    setTimeout(() => {}, 1000);
  });
});
