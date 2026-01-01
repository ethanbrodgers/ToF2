# validation_models.py: This file looks intimidating, but it's really just a few patterns used over and over again.
# It contains Pydantic models, which are classes that help you specify what fields an object (JSON or Python) should have.
# These are intended to be used whenever you want to get JSON data from generative AI.
# They can be imported from the validation package. See the file "__init__.py" in the same folder as this file to make more models importable.
# Please add your own Pydantic models to this file to suit your needs! You can also change the descriptions of existing models to add more clarifications for the AI (it can read these descriptions).

from typing import Annotated
from pydantic import BaseModel, Field, ConfigDict, RootModel
from enum import Enum



# ==== Word ====

class GenderEnum(Enum):
    # Gender options for word entries.
    m = "m"
    f = "f"
    n = "n"

class PosEnum(Enum):
    # Part-of-speech options for word entries.
    n = "n"
    p = "p"
    v = "v"
    adj = "adj"
    adv = "adv"
    i = "i"
    c = "c"
    q = "q"

class WordExSentence(BaseModel):
    # Fully specified example sentence for a word.
    model_config = ConfigDict(extra="forbid")
    en: str = Field(description="The English translation of this example sentence")
    targ: str = Field(description="The target (non-English) language translation of this example sentence")
    positive: bool = Field(description="Whether this example sentence uses the word correctly")

class Word(BaseModel):
    # Complete word schema for AI output and stored vocab entries.
    model_config = ConfigDict(extra="forbid")
    lang: str = Field(min_length=2, max_length=2, description="Two-letter ISO code for the non-English language, ex. 'es' for Spanish")
    en: str = Field(description="The word in English")
    targ: str = Field(description="The word in the target (non-English) language")
    # can't be named "def" in Python because def is a keyword; will still serialize as "def" in JSON
    definition: str = Field(alias="def", description="A brief, one-sentence definition")
    pos: PosEnum = Field(description="Part of speech: i stands for interjection, c stands for connector, and q stands for quantifier (aka measure word).")
    # "| None" and "default=None" together make this optional
    gender: GenderEnum | None = Field(default=None, description="Gender of the word; m for masculine, f for feminine, n for neuter, and null for no gender. Only applicable for nouns.")
    trans: str | None = Field(default=None, description="Transliteration to the Latin alphabet using the standard system for this language. Set this to null if the language already uses the Latin alphabet.")
    desc: str = Field(description="a text-based description of the word, including any special information about how to use this word. Don't include any basic information such as the word's gender.")
    ex: list[WordExSentence] = Field(min_length=1, max_length=3, description="1 to 3 example sentences that show how to use this word")

class WordExSentencePartial(BaseModel):
    # Partial example sentence for AI lookup prompts.
    en: str | None = Field(default=None, description="The English translation of this example sentence")
    targ: str | None = Field(default=None, description="The target (non-English) language translation of this example sentence")
    positive: bool | None = Field(default=None, description="Whether this example sentence uses the word correctly")

class WordPartial(BaseModel):
    # Partial word schema for AI lookup prompts.
    model_config = ConfigDict(extra="ignore")
    lang: str | None = Field(default=None, min_length=2, max_length=2, description="Two-letter ISO code for the non-English language, ex. 'es' for Spanish")
    en: str | None = Field(default=None, description="The word in English")
    targ: str | None = Field(default=None, description="The word in the target (non-English) language")
    # can't be named "def" in Python because def is a keyword; will still serialize as "def" in JSON
    definition: str | None = Field(default=None, alias="def", description="A brief, one-sentence definition")
    pos: PosEnum | None = Field(default=None, description="Part of speech: i stands for interjection, c stands for connector, and q stands for quantifier (aka measure word).")
    # "| None" and "default=None" together make this optional
    gender: GenderEnum | None = Field(default=None, description="Gender of the word; m for masculine, f for feminine, n for neuter, and null for no gender. Only applicable for nouns.")
    trans: str | None = Field(default=None, description="Transliteration to the Latin alphabet using the standard system for this language. Set this to null if the language already uses the Latin alphabet.")
    desc: str | None = Field(default=None, description="a text-based description of the word, including any special information about how to use this word. Don't include any basic information such as the word's gender.")
    ex: list[WordExSentencePartial] | None = Field(default=None, description="0 to 3 example sentences that show how to use this word")


# ==== Lookup ====

class LookupPromptWord(BaseModel):
    # Lookup prompt wrapper for word generation.
    model_config = ConfigDict(extra="ignore")
    desc: str = Field(default="", description="Text instructions providing any specific details about the lookup; can be empty.")
    word: WordPartial | None = Field(default=None, description="Partial word object containing any subset of the word fields.")

class LookupChoiceWord(BaseModel):
    # Single lookup option with a complete word.
    model_config = ConfigDict(extra="forbid")
    desc: str = Field(description="Summary of this choice.")
    word: Word = Field(description="A complete word object matching the word schema.")

class LookupResultWord(BaseModel):
    # Object containing an ordered list of lookup options (most to least likely), capped at 5.
    model_config = ConfigDict(extra="forbid")
    choices: Annotated[list[LookupChoiceWord], Field(max_length=5)] = Field(description="Ordered list of lookup options (most to least likely), capped at 5.")
