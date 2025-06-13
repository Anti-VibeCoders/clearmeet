from openai import OpenAI
import os

client = OpenAI(
    base_url="https://api.novita.ai/v3/openai",
    api_key=os.getenv("AI_KEY")
)
model = "deepseek/deepseek-r1-0528"
stream=True
max_tokens = 1000

chat_completion_res = client.completions.create(
    model=model,
    prompt="Extracts a list of tasks with the name of the speaker and corresponding action",
    stream=stream,
    max_tokens=max_tokens,
)

if stream:
    for chunk in completion_res:
        print(chunk.choices[0].text or "", end="")
else:
    print(completion_res.choices[0].text)
