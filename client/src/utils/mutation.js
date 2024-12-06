const mutation = `
                mutation($content: String!, $sender: String!, $recipient: String!) {
                  sendMessage(content: $content, sender: $sender, recipient: $recipient) {
                    id
                    content
                    sender
                    recipient
                  }
                }
              `

export default mutation