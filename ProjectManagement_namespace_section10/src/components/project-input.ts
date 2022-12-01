import Component from "./base-component.js";
import * as Validation from "../util/validation.js";
import { Autobind } from "../decorators/autobind.js";
import { projectState } from "../state/project-state.js";

// ProjectInput Class
export class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
  titileInputElement: HTMLInputElement;
  descriptionInputElement: HTMLInputElement;
  mandayInputElement: HTMLInputElement;

  constructor() {
    super("project-input", "app", true, "user-input");

    this.titileInputElement = this.element.querySelector(
      "#title"
    ) as HTMLInputElement;

    this.descriptionInputElement = this.element.querySelector(
      "#description"
    ) as HTMLInputElement;

    this.mandayInputElement = this.element.querySelector(
      "#manday"
    ) as HTMLInputElement;

    this.configure();
  }

  configure() {
    this.element.addEventListener("submit", this.submitHandler);
  }

  renderContent(): void {}

  private emptyValidator(data: string): boolean {
    return data.trim().length === 0;
  }

  private gatherUserInput(): [string, string, number] | void {
    const enteredTitle = this.titileInputElement.value;
    const enteredDescription = this.descriptionInputElement.value;
    const enteredMonday = this.mandayInputElement.value;

    const titileValidatable: Validation.Validatable = {
      value: enteredTitle,
      required: true,
    };
    const descriptionValidatable: Validation.Validatable = {
      value: enteredDescription,
      required: true,
      minLength: 5,
    };
    const mandayValidatable: Validation.Validatable = {
      value: +enteredMonday,
      required: true,
      min: 1,
      max: 1000,
    };
    if (
      !Validation.validate(titileValidatable) ||
      !Validation.validate(descriptionValidatable) ||
      !Validation.validate(mandayValidatable)
    ) {
      alert("入力値が正しくありません。再度お試しください");
      return;
    } else {
      return [enteredTitle, enteredDescription, +enteredMonday];
    }
  }

  private clearInputs() {
    this.titileInputElement.value = "";
    this.descriptionInputElement.value = "";
    this.mandayInputElement.value = "";
  }

  @Autobind
  private submitHandler(event: Event) {
    event.preventDefault();
    const userInput = this.gatherUserInput();
    if (Array.isArray(userInput)) {
      const [title, description, manday] = userInput;
      projectState.addProject(title, description, manday);
      this.clearInputs();
    }
  }
}
