# Errors 

## test_future_value_service (Assertion Error):
There is no error handling for if the either the beta or the sp500 data is available because the test keeps giving the wrong error message when both tests are carried out. 
    **To test when beta is not found it gives the error messsage for when sp500 is not found and vice versa.**
    **stdout call: S&P 500 data is not available**

## test_calculate_future_value_success:
The only problem is the test cases. It is very hard to mock the values if they are not known or shown. Some dates do not have values so that can be hard.

## test_get_beta_not_found:
It is kind of hard to check when it comes to the beta and checking for it. There is a key error for some reason. Maybe the mock beta can only return a value. 

## test_get_beta_success:
The beta value expected is different from the actual returned.

## beta not found:
The test expects a 404 status code when the beta is not found, but the API returns a 200 status code.

## test_get_market_return_rate
There is a huge issure with how the market return rate can be calculate because the actual value for a start date cannot be accessed.

## test_future_value
Future value is given is different from expected. This must have resulted due to the other values being wrong.
