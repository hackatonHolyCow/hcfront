export const PostUploadAudio = async (audio, id = 0) => {
  const formData = new FormData();
  formData.append("file", audio, "audio.webm");
  formData.append("id", id);

  try {
    const response = await fetch("http://192.168.1.163:8001/api/order", {
      method: "POST",
      body: formData,
    });
    if (response.ok) {
      const body = await response.json();
      console.log("el bodyl", body);
      return body;
    } else {
      console.log("NO ME LA CONTES AMIGO QUE PASO", response);
      return [];
    }
  } catch (error) {
    console.log("Error on PostUploadAudio", error);
    return [];
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
    });

    if (!response.ok) {
      throw new Error("Error on PostOrder");
    }

    const body = await response.json();
    console.log("EL CUERPECITO", body);
    return body;
  } catch (err) {
    throw new Error(err);
  }
};
