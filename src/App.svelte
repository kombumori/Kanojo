<script lang="ts">
  import ky from "ky";
  import type { ChatCompletion } from "./types";

  let text = "";
  let reply = ''
  let groqKey = localStorage.getItem("GROQ_KEY") ?? "";
  $: localStorage.setItem("GROQ_KEY", groqKey);

  const SpeechRecognition =
    globalThis.webkitSpeechRecognition ?? globalThis.SpeechRecognition;

  const recognition = new SpeechRecognition();
  recognition.lang = "ja";
  recognition.continuous = true;
  class LLM {
    async send(msg: string) {
      const res = await ky.post(
        "https://api.groq.com/openai/v1/chat/completions",
        {
          json: {
            messages: [
              {
                role: "system",
                content: "英語は絶対に使わず、日本語を絶対に使用しなさい。また、あなたはGirlfriendです。ユーザーのGirlfriendとして、ユーザーに親しみなさい",
              },
              {
                role: "user",
                content: msg,
              },
            ],
            model: "llama3-70b-8192",
          },
          headers: {
            Authorization: `Bearer ${groqKey}`,
            "Content-Type": "application/json",
          },
        },
      );
      const result = await res.json<ChatCompletion>();
      return result.choices[0].message.content;
    }
  }

  const llm = new LLM()
  recognition.onresult = async (evt) => {
    text = evt.results[0][0].transcript;
    const res = await llm.send(text)
    reply = res
  }
  const speak = (text: string) => {
    const speechSynthesisUtterance = new SpeechSynthesisUtterance(text)
    speechSynthesisUtterance.lang = 'ja-JP'
    speechSynthesisUtterance.volume = 1

    const spoke = speechSynthesis.speak(speechSynthesisUtterance)
    console.log(spoke)
  }
  $: speak(reply)

  const handleStart = () => {
    recognition.start();
  };
  const handleEnd = () => {
    recognition.stop();
  };
</script>

<main class="p-3">
  <label>
    Input your Groq key:
    <input bind:value={groqKey} class="rounded-full border p-1" />
  </label>
  <div class="grid grid-cols-3 my-2 gap-2">
    <button class="bg-blue-300 hover:bg-blue-400 rounded-full" on:click={() => speak('こんにちは')}>初期化</button>
    <button on:click={handleStart}>🎙️Start</button>
    <button on:click={handleEnd}>🎙️Stop</button>
  </div>
  <div>
    <div>your question: {text}</div>
    <div>Kanojo reply: {reply}</div>
  </div>
</main>
