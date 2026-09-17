import  api  from "./api";

export async function analyzeCSV(file) {
  const formData = new FormData();

  formData.append("file", file);

  const response = await api.post(
    "/analysis/upload",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  console.log(response.data)
  return response.data;
}

export async function cleanDataset(file, actions) {
  const formData = new FormData();

  formData.append("file", file);
  formData.append("actions_json", JSON.stringify(actions));

  const response = await api.post(
    "/analysis/clean",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response.data;
}

export async function downloadCleanedCSV(file, actions) {
  const formData = new FormData();

  formData.append("file", file);
  formData.append("actions_json", JSON.stringify(actions));

  const response = await api.post(
    "/analysis/clean/download",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      responseType: "blob",
    }
  );
  return response.data;
}