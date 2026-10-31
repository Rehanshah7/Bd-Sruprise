"use client";

import { useState } from "react";
import { BirthdayCover } from "@/components/birthday/birthday-cover";
import { SecretPin } from "@/components/birthday/secret-pin";
import { BowArrowFilm } from "@/components/birthday/bow-arrow-film";
import { BirthdayFilm } from "@/components/birthday/birthday-film";
import { MemoriesGallery } from "@/components/birthday/memories-gallery";
import { LoveLetter } from "@/components/birthday/love-letter";

type Stage = "cover" | "bow-arrow" | "animations" | "memories" | "letter";

  export default function Home() {
    const [stage, setStage] = useState<Stage>("cover");

        return (
        <main>
          {stage === "cover" && (
            <>
              <BirthdayCover />
              <SecretPin onStartFilm={() => setStage("bow-arrow")} />
            </>
          )}

          {stage === "bow-arrow" && (
            <BowArrowFilm
              onNext={() => setStage("animations")}
              onBackToHome={() => setStage("cover")}
            />
          )}

          {stage === "animations" && (
            <BirthdayFilm
              onBackToHome={() => setStage("cover")}
              onBackToBow={() => setStage("bow-arrow")}
              onOpenMemories={() => setStage("memories")}
            />
          )}

        {stage === "memories" && (
          <MemoriesGallery
            onBackToCake={() => setStage("animations")}
            onContinue={() => setStage("letter")}
          />
        )}

        {stage === "letter" && (
          <LoveLetter
            onBackToMemories={() => setStage("memories")}
            onBackToHome={() => setStage("cover")}
          />
        )}
      </main>
    );
  }
