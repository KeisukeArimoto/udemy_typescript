(()=>{"use strict";var __webpack_modules__={948:()=>{eval('\n;// CONCATENATED MODULE: ./src/components/base-component.ts\n// Component Class\r\nclass Component {\r\n    constructor(templateId, hostElementId, insertAtStart, newElementId) {\r\n        this.templateElement = document.getElementById(templateId);\r\n        this.hostElement = document.getElementById(hostElementId);\r\n        const importedNode = document.importNode(this.templateElement.content, true);\r\n        this.element = importedNode.firstElementChild;\r\n        if (newElementId) {\r\n            this.element.id = newElementId;\r\n        }\r\n        this.attach(insertAtStart);\r\n    }\r\n    attach(insertAtBeginning) {\r\n        this.hostElement.insertAdjacentElement(insertAtBeginning ? "afterbegin" : "beforeend", this.element);\r\n    }\r\n}\r\n\n;// CONCATENATED MODULE: ./src/util/validation.ts\nfunction validate(validatableInput) {\r\n    let isValid = true;\r\n    if (validatableInput.required) {\r\n        isValid = isValid && validatableInput.value.toString().trim().length !== 0;\r\n    }\r\n    if (validatableInput.minLength != null &&\r\n        typeof validatableInput.value === "string") {\r\n        isValid =\r\n            isValid && validatableInput.value.length >= validatableInput.minLength;\r\n    }\r\n    if (validatableInput.maxLength != null &&\r\n        typeof validatableInput.value === "string") {\r\n        isValid =\r\n            isValid && validatableInput.value.length <= validatableInput.maxLength;\r\n    }\r\n    if (validatableInput.min != null &&\r\n        typeof validatableInput.value === "number") {\r\n        isValid = isValid && validatableInput.value >= validatableInput.min;\r\n    }\r\n    if (validatableInput.max != null &&\r\n        typeof validatableInput.value === "number") {\r\n        isValid = isValid && validatableInput.value <= validatableInput.max;\r\n    }\r\n    return isValid;\r\n}\r\n\n;// CONCATENATED MODULE: ./src/decorators/autobind.ts\n// autobind decorator\r\nfunction Autobind(_, _2, descripter) {\r\n    const originalmethod = descripter.value;\r\n    const adjDescriptor = {\r\n        configurable: true,\r\n        enumerable: true,\r\n        get() {\r\n            const boundFn = originalmethod.bind(this);\r\n            return boundFn;\r\n        },\r\n    };\r\n    return adjDescriptor;\r\n}\r\n\n;// CONCATENATED MODULE: ./src/models/project.ts\n// Project Type\r\nvar ProjectStatus;\r\n(function (ProjectStatus) {\r\n    ProjectStatus[ProjectStatus["Active"] = 0] = "Active";\r\n    ProjectStatus[ProjectStatus["Finished"] = 1] = "Finished";\r\n})(ProjectStatus || (ProjectStatus = {}));\r\nclass Project {\r\n    constructor(id, title, description, manday, status) {\r\n        this.id = id;\r\n        this.title = title;\r\n        this.description = description;\r\n        this.manday = manday;\r\n        this.status = status;\r\n    }\r\n}\r\n\n;// CONCATENATED MODULE: ./src/state/project-state.ts\n\r\nclass State {\r\n    constructor() {\r\n        this.listeners = [];\r\n    }\r\n    addListener(listenerFunction) {\r\n        this.listeners.push(listenerFunction);\r\n    }\r\n}\r\nclass ProjectState extends State {\r\n    constructor() {\r\n        super();\r\n        this.projects = [];\r\n    }\r\n    static getInstance() {\r\n        if (this.instance) {\r\n            return this.instance;\r\n        }\r\n        this.instance = new ProjectState();\r\n        return this.instance;\r\n    }\r\n    addProject(title, description, manday) {\r\n        const newProject = new Project(Math.random().toString(), title, description, manday, ProjectStatus.Active);\r\n        this.projects.push(newProject);\r\n        this.updateListeners();\r\n    }\r\n    moveProject(projectId, newStatus) {\r\n        const project = this.projects.find((prj) => prj.id === projectId);\r\n        if (project && project.status !== newStatus) {\r\n            project.status = newStatus;\r\n            this.updateListeners();\r\n        }\r\n    }\r\n    updateListeners() {\r\n        for (const listenerFunction of this.listeners) {\r\n            listenerFunction(this.projects.slice());\r\n        }\r\n    }\r\n}\r\nconst projectState = ProjectState.getInstance();\r\n\n;// CONCATENATED MODULE: ./src/components/project-input.ts\nvar __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {\r\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\r\n    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);\r\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\r\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\r\n};\r\n\r\n\r\n\r\n\r\n// ProjectInput Class\r\nclass ProjectInput extends Component {\r\n    constructor() {\r\n        super("project-input", "app", true, "user-input");\r\n        this.titileInputElement = this.element.querySelector("#title");\r\n        this.descriptionInputElement = this.element.querySelector("#description");\r\n        this.mandayInputElement = this.element.querySelector("#manday");\r\n        this.configure();\r\n    }\r\n    configure() {\r\n        this.element.addEventListener("submit", this.submitHandler);\r\n    }\r\n    renderContent() { }\r\n    emptyValidator(data) {\r\n        return data.trim().length === 0;\r\n    }\r\n    gatherUserInput() {\r\n        const enteredTitle = this.titileInputElement.value;\r\n        const enteredDescription = this.descriptionInputElement.value;\r\n        const enteredMonday = this.mandayInputElement.value;\r\n        const titileValidatable = {\r\n            value: enteredTitle,\r\n            required: true,\r\n        };\r\n        const descriptionValidatable = {\r\n            value: enteredDescription,\r\n            required: true,\r\n            minLength: 5,\r\n        };\r\n        const mandayValidatable = {\r\n            value: +enteredMonday,\r\n            required: true,\r\n            min: 1,\r\n            max: 1000,\r\n        };\r\n        if (!validate(titileValidatable) ||\r\n            !validate(descriptionValidatable) ||\r\n            !validate(mandayValidatable)) {\r\n            alert("入力値が正しくありません。再度お試しください");\r\n            return;\r\n        }\r\n        else {\r\n            return [enteredTitle, enteredDescription, +enteredMonday];\r\n        }\r\n    }\r\n    clearInputs() {\r\n        this.titileInputElement.value = "";\r\n        this.descriptionInputElement.value = "";\r\n        this.mandayInputElement.value = "";\r\n    }\r\n    submitHandler(event) {\r\n        event.preventDefault();\r\n        const userInput = this.gatherUserInput();\r\n        if (Array.isArray(userInput)) {\r\n            const [title, description, manday] = userInput;\r\n            projectState.addProject(title, description, manday);\r\n            this.clearInputs();\r\n        }\r\n    }\r\n}\r\n__decorate([\r\n    Autobind\r\n], ProjectInput.prototype, "submitHandler", null);\r\n\n;// CONCATENATED MODULE: ./src/components/project-item.ts\nvar project_item_decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {\r\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\r\n    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);\r\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\r\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\r\n};\r\n\r\n\r\n// Project Item\r\nclass ProjectItem extends Component {\r\n    get manday() {\r\n        if (this.project.manday < 20) {\r\n            return this.project.manday.toString() + "人日";\r\n        }\r\n        else {\r\n            return (this.project.manday / 20).toString() + "人月";\r\n        }\r\n    }\r\n    constructor(hostId, project) {\r\n        super("single-project", hostId, false, project.id);\r\n        this.project = project;\r\n        this.configure();\r\n        this.renderContent();\r\n    }\r\n    dragStartHandler(event) {\r\n        event.dataTransfer.setData("text/plain", this.project.id);\r\n        event.dataTransfer.effectAllowed = "move";\r\n    }\r\n    dragEndHandler(_) {\r\n        console.log("Drag終了");\r\n    }\r\n    configure() {\r\n        this.element.addEventListener("dragstart", this.dragStartHandler);\r\n        this.element.addEventListener("dragend", this.dragEndHandler);\r\n    }\r\n    renderContent() {\r\n        this.element.querySelector("h2").textContent = this.project.title;\r\n        this.element.querySelector("h3").textContent = this.manday;\r\n        this.element.querySelector("p").textContent = this.project.description;\r\n    }\r\n}\r\nproject_item_decorate([\r\n    Autobind\r\n], ProjectItem.prototype, "dragStartHandler", null);\r\n\n;// CONCATENATED MODULE: ./src/components/project-list.ts\nvar project_list_decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {\r\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\r\n    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);\r\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\r\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\r\n};\r\n\r\n\r\n\r\n\r\n\r\n// ProjectList Class\r\nclass ProjectList extends Component {\r\n    constructor(type) {\r\n        super("project-list", "app", false, `${type}-projects`);\r\n        this.type = type;\r\n        this.assignedProjects = [];\r\n        this.configure();\r\n        this.renderContent();\r\n    }\r\n    dragOverHandler(event) {\r\n        if (event.dataTransfer && event.dataTransfer.types[0] === "text/plain") {\r\n            event.preventDefault();\r\n            const listEl = this.element.querySelector("ul");\r\n            listEl.classList.add("droppable");\r\n        }\r\n    }\r\n    dropHandler(event) {\r\n        const prjId = event.dataTransfer.getData("text/plain");\r\n        projectState.moveProject(prjId, this.type === "active" ? ProjectStatus.Active : ProjectStatus.Finished);\r\n    }\r\n    dragLeaveHandler(_) {\r\n        const listEl = this.element.querySelector("ul");\r\n        listEl.classList.remove("droppable");\r\n    }\r\n    configure() {\r\n        this.element.addEventListener("dragover", this.dragOverHandler);\r\n        this.element.addEventListener("drop", this.dropHandler);\r\n        this.element.addEventListener("dragleave", this.dragLeaveHandler);\r\n        projectState.addListener((projects) => {\r\n            const relevantProjects = projects.filter((prj) => {\r\n                if (this.type === "active") {\r\n                    return prj.status === ProjectStatus.Active;\r\n                }\r\n                return prj.status === ProjectStatus.Finished;\r\n            });\r\n            this.assignedProjects = relevantProjects;\r\n            this.renderProjects();\r\n        });\r\n    }\r\n    renderContent() {\r\n        const listId = `${this.type}-projects-list`;\r\n        this.element.querySelector("ul").id = listId;\r\n        this.element.querySelector("h2").textContent =\r\n            this.type === "active" ? "実行中プロジェクト" : "完了プロジェクト";\r\n    }\r\n    renderProjects() {\r\n        const listElement = document.getElementById(`${this.type}-projects-list`);\r\n        listElement.innerHTML = "";\r\n        for (const prjItem of this.assignedProjects) {\r\n            new ProjectItem(listElement.id, prjItem);\r\n        }\r\n    }\r\n}\r\nproject_list_decorate([\r\n    Autobind\r\n], ProjectList.prototype, "dragOverHandler", null);\r\nproject_list_decorate([\r\n    Autobind\r\n], ProjectList.prototype, "dropHandler", null);\r\nproject_list_decorate([\r\n    Autobind\r\n], ProjectList.prototype, "dragLeaveHandler", null);\r\n\n;// CONCATENATED MODULE: ./src/app.ts\n\r\n\r\nnew ProjectInput();\r\nnew ProjectList("active");\r\nnew ProjectList("finished");\r\n\n\n//# sourceURL=webpack://section11/./src/app.ts_+_8_modules?')}},__webpack_exports__={};__webpack_modules__[948]()})();