import { Message } from "../../services-def";

export const NODE_DELETED_TOPIC = "NODE_DELETED_TOPIC"

export function createNodeDeletionMessage(nodeId: string): Message {
  return {
    topic: NODE_DELETED_TOPIC,
    recipient: nodeId,
    payload: {},
  };
}
