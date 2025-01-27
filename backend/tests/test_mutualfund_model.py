
from app.models.mutualfund_model import get_mutual_funds

def test_get_mutual_funds():
    result = get_mutual_funds()
    
    assert isinstance(result, list)
    
    assert len(result) > 0 
    
    assert "ticker" in result[0]
    assert "name" in result[0]
    
    assert result[0]["ticker"] == "VSMPX"
