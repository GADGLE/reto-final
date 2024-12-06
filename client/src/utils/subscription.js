const subscriptionQuery = `
          subscription {
            messageReceived {
              id
              content
              sender
              recipient
            }
          }
        `

export default subscriptionQuery