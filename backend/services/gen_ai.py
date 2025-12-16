from openai import OpenAI
from dotenv import load_dotenv

# API keys and setup

# API keys should be set when load_env is called in run.py.
# If they are not, un-comment the following line:
# load_dotenv()
openai_client = OpenAI()


# exports

def call_chatgpt(ai_model, messages, json_model=None):
    """Calls the given model (ex. "gpt-4") of ChatGPT with the given message context
    and returns ChatGPT's response as a str. See schema "ChatGPT messages" in the documentation
    for details on the messages param. json_model should be a Pydantic model if provided: see
    an example in backend/validation/validation_models.py or at https://platform.openai.com/docs/guides/structured-outputs"""
    if json_model is None:
        response = openai_client.responses.create(
            model=ai_model,
            input=messages,
        )
    else:
        response = openai_client.responses.parse(
            model=ai_model,
            input=messages,
            text_format=json_model
        )
    return response.output_text

