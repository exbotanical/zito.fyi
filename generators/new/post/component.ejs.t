---
to: "src/pages/<%= name %>.md"
---
<%

%>---
title: <%= name.replaceAll('-', ' '); %>
subtitle:
createdAt: <%= new Date().toISOString().substring(0,10); %>
imgSrc:
slug:
---

<%= '# ' + name.replaceAll('-', ' '); %>
