import { gql } from "@apollo/client";

export const FIND_DISTRIBUTABLES = gql`
query findDistributables($projectId: ID!) {
	findDistributables(projectId: $projectId) {
		id
		projectDefinitionId
		name
	}
}
`
export const FIND_DISTRIBUTABLE_ITEMS = gql`
query findDistributableItems($projectId: ID!, $reportDefinitionId: ID!) {
	findDistributableItems(
		projectId: $projectId
		reportDefinitionId: $reportDefinitionId
	) {
		id
		projectId
		reportDefinitionId
		nodeId
		formulaId
		suppliedItem {
			datasheetId
			elementDefId
			childReferenceId
			organization {
				id
				name
				email
			}
		}
		distribution_ids
		summary {
			label
			value {
				__typename
				... on IntFieldValue {
					integer
				}
				... on DecimalFieldValue {
					numeric
				}
				... on StringFieldValue {
					text
				}
				... on BoolFieldValue {
					enabled
				}
			}
			unit
		}
		columns {
			label
			value {
				__typename
				... on IntFieldValue {
					integer
				}
				... on DecimalFieldValue {
					numeric
				}
				... on StringFieldValue {
					text
				}
				... on BoolFieldValue {
					enabled
				}
			}
			unit
		}
		obsolete
	}
}
`