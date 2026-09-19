"use client";

import { Box, Button, Stack, Typography } from "@mui/material";
import { FormEvent, useState } from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { pt } from "date-fns/locale";

interface Props {
  selectedArea: string;
}

export default function CreateGameForm({ selectedArea }: Props) {
  const [date, setDate] = useState<Date>(new Date());

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const gameData = {
      date,
      area: selectedArea,
    };

    console.log(gameData);
  };
  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Stack sx={{ flexDirection: "column", gap: 4 }}>
        <Typography>A criar jogo em {selectedArea}</Typography>
        <LocalizationProvider adapterLocale={pt} dateAdapter={AdapterDateFns}>
          <DatePicker
            value={date}
            onChange={(value) => setDate(new Date(value?.toDateString() ?? ""))}
          />
        </LocalizationProvider>

        <Button>Criar Jogo</Button>
      </Stack>
    </Box>
  );
}
