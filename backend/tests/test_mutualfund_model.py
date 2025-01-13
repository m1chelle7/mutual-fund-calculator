from app.models.mutualfund_model import get_mutual_funds

def test_get_mutual_funds():
    result = get_mutual_funds()
    
    assert isinstance(result, list) # Check if it returns a list
    
    assert len(result) > 0 # Check if the list is not empty
    
    assert "ticker" in result[0] # Check if the expected keys are in the first dictionary of the list
    assert "name" in result[0]
    
    assert result[0]["ticker"] == "VSMPX" # Check if the ticker for the first mutual fund is correct
