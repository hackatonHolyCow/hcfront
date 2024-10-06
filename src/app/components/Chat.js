"use client";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import { useRef, useState } from "react";
import MicIcon from "@mui/icons-material/Mic";
import StopIcon from "@mui/icons-material/Stop";
import { PostUploadAudio } from "../api/audio";

const Chat = ({ onRequest, id, messages }) => {
  const mediaStream = useRef(null);
  const chunks = useRef([]);
  const mediaRecorder = useRef(null);
  const [isRecording, setIsRecording] = useState(false);
  // const [messages, setMessages] = useState([
  //   {
  //     agent: "Hola! Pide tu orden haciendo click en el botón del menú",
  //     user: "Me gustaría pedir dos papitas",
  //   },
  //   {
  //     agent: "Claro! Algo más?",
  //     user: "Su cokita rica mmmm que rica la cokita",
  //   },
  //   {
  //     agent: "Me alegra que te guste la cokita, es muy rica!",
  //     user: "Siono ñami ñami",
  //   },
  //   {
  //     agent: "Me alegra que te guste la cokita, es muy rica!",
  //     user: "Siono ñami ñami",
  //   },
  // ]);
  const startRecording = async () => {
    setIsRecording(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaStream.current = stream;
      mediaRecorder.current = new MediaRecorder(stream);
      mediaRecorder.current.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunks.current.push(e.data);
        }
      };
      mediaRecorder.current.onstop = async () => {
        const recordedBlob = new Blob(chunks.current, { type: "audio/webm" });
        const response = await PostUploadAudio(recordedBlob, id);
        onRequest(response);
        const url = URL.createObjectURL(recordedBlob);
        chunks.current = [];
      };
      mediaRecorder.current.start();
    } catch (error) {
      console.log("error on get acces to mic", error);
    }
  };

  const stopRecording = () => {
    setIsRecording(false);
    if (mediaRecorder.current && mediaRecorder.current.state === "recording") {
      mediaRecorder.current.stop();
    }
    if (mediaStream.current) {
      mediaStream.current.getTracks().forEach((track) => {
        track.stop();
      });
    }
  };
  return (
    <>
      <Box
        sx={{
          display: "flex",
          borderWidth: 10,
          borderColor: "black",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          maxHeight: "45vh",
        }}
      >
        <Typography variant="h3">Chat</Typography>
        <Card
          sx={{
            backgroundColor: "#e6f6fa",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <CardContent
            sx={{
              overflow: "auto",
            }}
          >
            {messages.map((msg, index) => (
              <Box key={index + "messages"} sx={{ margin: 3 }}>
                <Typography variant="h6">
                  <strong>Tú: </strong>
                  {msg.user}
                </Typography>
                <Typography variant="h6">
                  <strong>Waiter:</strong>
                  {`${msg.agent}`}
                </Typography>
              </Box>
            ))}
          </CardContent>
          <CardActions
            sx={{
              marginTop: "auto",
              justifyContent: "center",
            }}
          >
            {/* <Button
              variant="contained"
              color="primary"
              sx={{ borderRadius: "50%", width: 70, height: 70 }}
            >
              <MicIcon sx={{ fontSize: 30 }} />
            </Button> */}
          </CardActions>
        </Card>
        <Box sx={{ marginTop: 2, flexDirection: "row", display: "flex" }}>
          <Typography variant="h6" sx={{ marginTop: 2, marginRight: 3 }}>
            {isRecording
              ? "Click here to stop record your order"
              : "Click here to start recording your order"}
          </Typography>
          <Button
            variant="contained"
            color={isRecording ? "error" : "primary"}
            sx={{ borderRadius: "50%", width: 70, height: 70 }}
            onClick={() => {
              if (isRecording) stopRecording();
              else startRecording();
            }}
          >
            {isRecording ? (
              <StopIcon sx={{ fontSize: 30 }} />
            ) : (
              <MicIcon sx={{ fontSize: 30 }} />
            )}
          </Button>
        </Box>
      </Box>
    </>
  );
};
export default Chat;
