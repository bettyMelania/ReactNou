export function getLogger(tag) {
    return message => console.log(`${tag}`, message);
}

export function issueToText(issue) {

    if (issue) {
        getLogger(issue.error);
        return issue.error;
    }
    return null;
}

export class ExtendableError extends Error {
    constructor(message) {
        super();
        this.message = message;
        this.stack = (new Error()).stack;
        this.name = this.constructor.name;
    }
}

export class ResourceError extends ExtendableError {
    constructor(m, issue) {
        super(m);
        this.issue = issue;
    }
}