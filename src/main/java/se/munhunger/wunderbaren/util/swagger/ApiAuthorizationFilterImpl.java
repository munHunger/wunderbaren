package se.munhunger.wunderbaren.util.swagger;

import io.swagger.core.filter.SwaggerSpecFilter;
import io.swagger.model.ApiDescription;
import io.swagger.models.Model;
import io.swagger.models.Operation;
import io.swagger.models.parameters.Parameter;
import io.swagger.models.properties.Property;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;
import java.util.Map;

/**
 * Created by Marcus Münger on 2017-04-25.
 */
public class ApiAuthorizationFilterImpl implements SwaggerSpecFilter
{
	static Logger logger = LoggerFactory.getLogger(ApiAuthorizationFilterImpl.class);

	public boolean isOperationAllowed(Operation operation, ApiDescription api, Map<String, List<String>> params,
									  Map<String, String> cookies, Map<String, List<String>> headers)
	{
		return true;
	}

	public boolean isParamAllowed(Parameter parameter, Operation operation, ApiDescription api,
								  Map<String, List<String>> params, Map<String, String> cookies,
								  Map<String, List<String>> headers)
	{
		return true;
	}

	@Override
	public boolean isPropertyAllowed(Model model, Property property, String propertyName,
									 Map<String, List<String>> params, Map<String, String> cookies,
									 Map<String, List<String>> headers)
	{
		return true;
	}
}