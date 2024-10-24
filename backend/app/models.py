from pydantic import BaseModel
from typing import List

class Operation(BaseModel):
    expression: List[str]