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