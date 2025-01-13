# Errors 

## test_future_value_service (Assertion Error):
There is no error handling for if the either the beta or the sp500 data is available because the test keeps giving the wrong error message when both tests are carried out. 
    **To test when beta is not found it gives the error messsage for when sp500 is not found and vice versa.**
    **stdout call: S&P 500 data is not available**

## test_get_beta_success:
The beta value expected is different from the actual returned.

## beta not found:
The test expects a 404 status code when the beta is not found, but the API returns a 200 status code.

## test_get_market_return_rate
Value is different from expected.

## test_future_value
Future value is given is different from expected. This must have resulted due to the other values being wrong.
