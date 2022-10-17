import { Message, Messaging } from "../services-def"

type Handler = (message: Message) => Promise<void>

export class MessageEmitter implements  Messaging{
  private topics = new Map<string, Handler[]>()


  async send(message: Message): Promise<void> {
    const handlers = this.topics.get(message.topic)

    if(handlers !== undefined) {
      await Promise.all(handlers.map(h => h(message)))
    }
  }

  listenFor(options: { topic: string, recipient?: string[], handler: (message: Message) => Promise<void> }): () => void {
    const handlers = this.topics.get(options.topic)
    const handler = async (message: Message) => {
      if(options.recipient === undefined || options.recipient.includes(message.recipient)) {
        await options.handler(message)
      }
    }

    if(handlers === undefined) {
      this.topics.set(options.topic, [handler])
    }
    else {
      handlers.push(handler)
    }

    return () => this.removeSubscription(options.topic, handler)
  }

  private removeSubscription(topic: string, handler: Handler): void {
    let handlers = this.topics.get(topic)

    if(handlers === undefined) {
      return
    }

    handlers = handlers.filter(x => x !== handler)

    if(handlers.length === 0) {
      this.topics.delete(topic)
    }
    else {
      this.topics.set(topic, handlers)
    }
  }
}