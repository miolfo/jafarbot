import * as irc from "irc";
import IMessage from "./IMessage";

export default interface IBaseModule {
    // Load necessary configurations used within the module
    Initialize(ircClient: irc.Client);

    GetName(): string;

    GetHelpMessage?(): string;
    // Handle a received irc message, return empty string if module should respond nothing, or the response
    HandleMessage(message: IMessage): string;
}
