"use client";

import AreaSelector from "@/app/components/area-selector/area-selector";
import CreateGameForm from "@/app/components/create-game-form/create-game-form";
import { Location } from "@/app/services/locations";
import { Button, Container, Divider, Stack, Typography } from "@mui/material";
import { useState } from "react";

interface Props {
  data: Location[];
}

export default function HomeClient({ data }: Props) {
  const [selectedArea, setSelectedArea] = useState<string>("");
  const [isCreatingGame, setIsCreatingGame] = useState<boolean>(false);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Stack sx={{ gap: 2 }}>
        <Typography variant="h5">Jogos Hoje</Typography>
        <Divider />

        <Stack direction="row" sx={{ gap: 2 }}>
          <AreaSelector
            selectedArea={selectedArea}
            setSelectedArea={setSelectedArea}
            data={data}
          />

          <Button
            disabled={!selectedArea}
            sx={{ flexShrink: 0 }}
            onClick={() => setIsCreatingGame(true)}
          >
            Criar Jogo
          </Button>
        </Stack>
        {isCreatingGame && <CreateGameForm selectedArea={selectedArea} />}
      </Stack>
    </Container>
  );
}
