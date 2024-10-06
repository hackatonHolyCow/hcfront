"use client";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Stack,
  Typography,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import MicIcon from "@mui/icons-material/Mic";
import StopIcon from "@mui/icons-material/Stop";
import { PostUploadAudio } from "../api/audio";
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
const Chat = ({ onRequest, id, messages }) => {
  const mediaStream = useRef(null);
  const chunks = useRef([]);
  const mediaRecorder = useRef(null);
  const [isRecording, setIsRecording] = useState(false);




  const reproduceAudio = async () => {
    console.log("a")
    if (messages.length > 0) {
      const lastMessage = messages[messages.length - 1].agent;
      try {
        // Sending the last message to the backend
        const response = await fetch('http://localhost:8000/api/v1/speech', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ text: lastMessage }),
        });
      
        console.log("RESPONSE",response.body);

        const reader = response.body.getReader();
        const chunks = [];
        let done = false;

        while (!done) {
          const { value, done: readerDone } = await reader.read();
          if (value) {
            chunks.push(value);
          }
          done = readerDone;
        }

        // Combine all chunks into a Blob
        const audioBlob = new Blob(chunks, { type: 'audio/mpeg' }); // Adjust type if needed

        // Create a URL for the Blob
        const audioUrl = URL.createObjectURL(audioBlob);

        // Create an audio element and play it
        const audio = new Audio(audioUrl);
        audio.play();


      }
        catch (error) {
          console.error('Error sending message or receiving audio:', error);
        } 
    }
  };


  useEffect(() => {
    console.log("Reproduce")
    reproduceAudio()
  }, [messages])
  
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
        {id !== 0 &&
        <Card
        sx={{
          width:"100%",
          backgroundColor: "#e6f6fa",
          display: "flex",
          flexDirection: "column"
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
                  <strong>Waiter: </strong>
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
          </CardActions>
        </Card>
        }
        <Box sx={{ marginTop: 2, flexDirection: "row", display: "flex" }}>
          <Typography variant="h6" sx={{ marginTop: 2, marginRight: 3 }}>
            {isRecording
              ? "Click here to stop record your order"
              : "Click here to start recording your order"}
          </Typography>
          <Stack direction={"row"} spacing={2}>

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
          {id !== 0 &&
          <Button
            variant="contained"
            color={"primary"}
            sx={{ borderRadius: "50%", width: 70, height: 70 }}
            onClick={() => {
              reproduceAudio()
            }}
          >
          <PlayCircleIcon sx={{fontSize: 30}}/>            
          </Button>
          }

          </Stack>

        </Box>
      </Box>
    </>
  );
};
export default Chat;
