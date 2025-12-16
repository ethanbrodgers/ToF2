from openai import OpenAI
from dotenv import load_dotenv

# API keys and setup

# API keys should be set when load_env is called in run.py.
# If they are not, un-comment the following line:
# load_dotenv()
openai_client = OpenAI()


# exports

def call_chatgpt(model, messages):
    """Calls the given model (ex. "gpt-4") of ChatGPT with the given message context
    and returns ChatGPT's response as a str. See schema "ChatGPT messages" in the documentation
    for details of the messages param."""
    
    response = openai_client.responses.create(
      model=model,
      input=messages
    )
    return response.output_text

