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


export const PostOrder = async (order) => {
  try {
    const response = await fetch("http://localhost:8000/api/v1/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(order),
    })

    if (!response.ok) {
      throw new Error("Error on PostOrder");
    }

    const body = await response.json();
    console.log("EL CUERPECITO", body);
    return body;
  } catch(err) {
    throw new Error(err);
  }
}