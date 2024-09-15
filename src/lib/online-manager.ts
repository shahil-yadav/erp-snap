import { ConnectionStatus, Network } from "@capacitor/network";

// const _ = {
//   _online: false,
//   _detectNetworkChange: () => {
//     Network.getStatus().then(({ connected }) => {
//       _._online = connected;
//     });

//     Network.addListener("networkStatusChange", ({ connected }) => {
//       _._online = connected;
//     });
//   },

//   isOnline: () => _._online,
//   subscribe: (callback: (arg: ConnectionStatus) => void) =>
//     Network.addListener("networkStatusChange", callback),
// };

class OnlineManager {
  #online = false; // Private field for online status

  constructor() {
    this.#detectNetworkChange(); // Call to set up network change detection
  }

  #detectNetworkChange() {
    Network.getStatus().then(({ connected }) => {
      this.#online = connected;
    });

    // Private method to detect network changes
    Network.addListener("networkStatusChange", ({ connected }) => {
      this.#online = connected; // Update private field based on connection status
    });
  }

  isOnline() {
    // Public method to check if online
    return this.#online;
  }

  subscribe(callback: (arg: ConnectionStatus) => void) {
    // Public method to subscribe to network changes
    return Network.addListener("networkStatusChange", callback);
  }
}

const onlineManager = new OnlineManager();

export { onlineManager };
