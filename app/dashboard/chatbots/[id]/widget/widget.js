(function () {
    const ChatWiseWidget = {
      init: function (options) {
        if (!options || !options.id) {
          console.error("ChatWise: Missing chatbot ID in init options")
          return
        }
  
        const widgetId = options.id
        const position = options.position || "right"
        const welcomeMessage = options.greeting || "Hello! How can I help you today?"
        const title = options.title || "Chat with our AI Assistant"
        const avatar = options.avatar || "https://cdn.chatwise.ai/default-avatar.png"
        const primaryColor = options.theme?.primaryColor || "#3B82F6"
        const textColor = options.theme?.textColor || "#1F2937"
        const backgroundColor = options.theme?.backgroundColor || "#FFFFFF"
        const buttonColor = options.theme?.buttonColor || primaryColor
  
        // Avoid duplicate widget
        if (document.getElementById("chatwise-widget-container")) return
  
        const container = document.createElement("div")
        container.id = "chatwise-widget-container"
        container.style.position = "fixed"
        container.style.zIndex = "9999"
        container.style.bottom = "24px"
        container.style[position] = "24px"
  
        container.innerHTML = `
          <style>
            .cw-widget-frame {
              width: 350px;
              height: 450px;
              border-radius: 10px;
              box-shadow: 0 4px 20px rgba(0,0,0,0.1);
              overflow: hidden;
              border: none;
            }
  
            .cw-launcher-button {
              width: 56px;
              height: 56px;
              border-radius: 50%;
              background-color: ${buttonColor};
              color: white;
              border: none;
              cursor: pointer;
              font-size: 24px;
              display: flex;
              align-items: center;
              justify-content: center;
              box-shadow: 0 2px 6px rgba(0,0,0,0.15);
            }
  
            .cw-launcher-button:hover {
              opacity: 0.9;
            }
          </style>
  
          <div id="cw-widget-toggle">
            <button class="cw-launcher-button">💬</button>
          </div>
        `
  
        document.body.appendChild(container)
  
        const toggleButton = container.querySelector("#cw-widget-toggle button")
  
        let widgetOpen = false
        let iframe
  
        toggleButton.addEventListener("click", () => {
          if (widgetOpen) {
            iframe?.remove()
            widgetOpen = false
            return
          }
  
          iframe = document.createElement("iframe")
          iframe.src = \`https://chatbot.chatwise.ai/widget/${widgetId}\`
          iframe.className = "cw-widget-frame"
          iframe.style.backgroundColor = backgroundColor
  
          container.appendChild(iframe)
          widgetOpen = true
        })
      },
    }
  
    window.cw = ChatWiseWidget
  })()
  