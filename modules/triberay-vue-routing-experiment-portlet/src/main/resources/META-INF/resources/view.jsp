<%@ include file="/init.jsp" %>

<%
	String siteUrl = themeDisplay.getPathFriendlyURLPublic() + layout.getGroup().getFriendlyURL();
%>

<aui:script require="<%= mainRequire %>">
	main.default(
	    '<portlet:namespace />',
		'<%= siteUrl %>'
	);
</aui:script>
