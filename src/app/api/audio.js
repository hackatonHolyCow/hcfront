export const PostUploadAudio = async (audio) => {
  const formData = new FormData();
  formData.append("file", audio, "audio.webm");
  console.log("formData", formData);
  try {
    const response = await fetch(
      "https://24a8-190-113-244-78.ngrok-free.app/api/order",
      {
        method: "POST",
        body: formData,
      }
    );
    if (response.ok) {
      const body = await response.json();
      console.log("EL CUERPECITO", body[body.length - 1]);
      console.log("NASHEEE ANASHEEE");
    } else {
      console.log("NO ME LA CONTES AMIGO NO SE QUE PASO", response);
    }
  } catch (error) {
    console.log("Error on PostUploadAudio", error);
  }
};
