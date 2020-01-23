#!/usr/bin/env bash

QUERY="query ProdReadyDashbaord { organization(login: \\\"${GH_ORG}\\\") { repositories(first: 100, orderBy: {field: UPDATED_AT, direction: DESC}, privacy: PRIVATE) { nodes { name master: ref(qualifiedName: \\\"${GH_DEV_BRANCH:-master}\\\") { name target { __typename ... on Commit { authoredDate } } } prd: ref(qualifiedName: \\\"${GH_PROD_BRANCH:-prd}\\\") { name target { __typename ... on Commit { authoredDate } } } } } } }"

curl \
  -X POST \
  -H "Authorization: bearer ${GH_TOKEN}" \
  --data "{ \"query\": \"${QUERY}\" }" \
  https://api.github.com/graphql