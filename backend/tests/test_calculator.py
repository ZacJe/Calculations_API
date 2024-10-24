from app.services.calculator import rpn_calculator

def test_rpn_calculator():
    assert rpn_calculator(["2", "3", "+"]) == 5
    assert rpn_calculator(["10", "5", "/"]) == 2
    assert rpn_calculator(["5", "1", "2", "+", "4", "*", "+", "3", "-"]) == 14
