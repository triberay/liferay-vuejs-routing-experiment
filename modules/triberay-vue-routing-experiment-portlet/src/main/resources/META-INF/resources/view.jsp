<%@ include file="/init.jsp" %>

<div id="<portlet:namespace />-1"></div>
<%
	String siteUrl = themeDisplay.getPathFriendlyURLPublic() + layout.getGroup().getFriendlyURL();
%>
<aui:script require="<%= mainRequire %>">
	main.default(
	    '<portlet:namespace />',
		'<%= siteUrl %>'
	);
</aui:script>
