# validation_models.py: This file looks intimidating, but it's really just a few patterns used over and over again.
# It contains Pydantic models, which are classes that help you specify what fields an object (JSON or Python) should have.
# These are intended to be used whenever you want to get JSON data from generative AI.
# They can be imported from the validation package. See the file "__init__.py" in the same folder as this file to make more models importable.
# Please add your own Pydantic models to this file to suit your needs! You can also change the descriptions of existing models to add more clarifications for the AI (it can read these descriptions).

from pydantic import BaseModel, Field
from enum import Enum



# ==== Word ====

class GenderEnum(Enum):
    m = "m"
    f = "f"
    n = "n"

class PosEnum(Enum):
    n = "n"
    p = "p"
    v = "v"
    adj = "adj"
    adv = "adv"
    i = "i"
    c = "c"
    q = "q"

class WordExSentence(BaseModel):
    en: str = Field(description="The English translation of this example sentence")
    targ: str = Field(description="The target (non-English) langauge translation of this example sentence")

class Word(BaseModel):
    lang: str = Field(description="Two-letter ISO code for the non-English language, ex. 'es' for Spanish")
    en: str = Field(description="The word in English")
    targ: str = Field(description="The word in the target (non-English) language")
    # can't be named "def" in Python because def is a keyword; will still serialize as "def" in JSON
    definition: str = Field(alias="def", description="A brief, one-sentence definition")
    pos: PosEnum = Field(description="Part of speech: i stands for interjection, c stands for connector, and q stands for quantifier (aka measure word).")
    # "| None" and "default=None" together make this optional
    gender: GenderEnum | None = Field(default=None, description="Gender of the word; m for masculine, f for feminine, n for neuter, and null for no gender. Only applicable for nouns.")
    trans: str | None = Field(default=None, description="Transliteration to the Latin alphabet using the standard system for this language. Set this to null if the language already uses the Latin alphabet.")
    desc: str = Field(description="a text-based description of the word, including any special information about how to use this word. Don't include any basic information such as the word's gender.")
    ex: list[WordExSentence] = Field(description="1 to 3 example sentences that show how to use this word")
