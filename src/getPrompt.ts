import { prompter } from "../host/src/prompt.gen";

type PrompterObj = typeof prompter;

export const getPrompt = <TPromptKey extends keyof PrompterObj>({
  prompt,
}: {
  prompt: TPromptKey;
}) => {
  return prompter[prompt];
};
