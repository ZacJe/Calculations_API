from fastapi import HTTPException
from typing import List

# Fonction de calcul de l'opération
def rpn_calculator(tokens: List[str]) -> float:
    stack = []
    for token in tokens:
        if token.isdigit():
            stack.append(float(token))
        else:
            try:
                b = stack.pop()
                a = stack.pop()
                if token == '+':
                    stack.append(a + b)
                elif token == '-':
                    stack.append(a - b)
                elif token == '*':
                    stack.append(a * b)
                elif token == '/':
                    stack.append(a / b)
                else:
                    raise HTTPException(status_code=400, detail="Opération invalide")
            except IndexError:
                raise HTTPException(status_code=400, detail="Expression invalide")
    if len(stack) != 1:
        raise HTTPException(status_code=400, detail="Expression invalide")
    return stack[0]
