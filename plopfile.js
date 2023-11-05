module.exports = (plop) => {
  // ./plopfile.js
  // Setting up Plop to generate domains
  // When run `npm run plop` you'll be asked to enter the domain name.
  plop.setGenerator("domain", {
    description: "Create a domain",
    prompts: [
      {
        type: "input",
        name: "name",
        message: 'Name of the component (e.g., "user-management"):',
      },
      {
        type: "input",
        name: "domain",
        message: 'Name of the Domain it belongs to (e.g., "user-management"):',
      },
      {
        type: "confirm",
        name: "isRoot",
        message:
          "Generate at the root level? (If not, you will be asked for categories):",
      },
      {
        type: "list",
        name: "category",
        message: "Select the category:",
        choices: ["page", "ui", "feature", "util"],
        when: (data) => !data.isRoot, // Prompt only if not generating at the root.
      },
    ],
    actions: (data) => {
      const { domain, category, name, isRoot } = data;

      const domainName = !!domain ? domain : name;
      if (isRoot) {
        return [
          {
            type: "add",
            path: `src/domain/${domainName}/${name}.tsx`,
            templateFile: "plop-templates/component.hbs",
          },
          {
            type: "add",
            path: `src/domain/${domainName}/${name}.scss`,
            templateFile: "plop-templates/component-scss.hbs",
          },
        ];
      }

      return [
        {
          type: "add",
          path: `src/domain/${domainName}/${category}/${name}/${name}.tsx`,
          templateFile: "plop-templates/component.hbs",
        },
        {
          type: "add",
          path: `src/domain/${domainName}/${category}/${name}/${name}.scss`,
          templateFile: "plop-templates/component-scss.hbs",
        },
      ];
    },
  });
  // Setting up Plop to generate domains
  // When run `npm run plop` you'll be asked to enter the domain name.
  plop.setGenerator("core", {
    description: "Create a core",
    prompts: [
      {
        type: "input",
        name: "name",
        message: 'Name of the component (e.g., "user-management"):',
      },
      {
        type: "list",
        name: "type",
        message: "Select the type:",
        choices: [
          "page",
          "ui",
          "feature",
          "hook",
          "util",
          "query",
          "model",
          "service",
        ],
      },
    ],
    actions: (data) => {
      const { name, type } = data;

      return [
        {
          type: "add",
          path: `src/core/${type}/${name}/${name}.tsx`,
          templateFile: "plop-templates/component.hbs",
        },
        {
          type: "add",
          path: `src/core/${type}/${name}/${name}.scss`,
          templateFile: "plop-templates/component-scss.hbs",
        },
      ];
    },
  });
  // Setting up Plop to generate components
  // When run `npm run plop` you'll be asked to enter the component name.
  plop.setGenerator("component", {
    description: "Create a component",
    prompts: [
      {
        type: "input",
        name: "name",
        message: 'Name of the component (e.g., "MyComponent"):',
      },
      {
        type: "input",
        name: "directory",
        message: 'Directory name for your component (e.g., "components"):',
      },
    ],
    actions: (data) => {
      const { directory } = data;
      const currentDirectory = process.cwd();

      const path = directory
        ? `${directory}/{{name}}/{{name}}.tsx`
        : `${currentDirectory}/{{name}}/{{name}}.tsx`;
      const pathStyle = directory
        ? `${directory}/{{name}}/{{name}}.scss`
        : `${currentDirectory}/{{name}}/{{name}}.scss`

      return [
        {
          type: "add",
          path,
          templateFile: "plop-templates/component.hbs",
        },
        {
          type: "add",
          path: pathStyle,
          templateFile: "plop-templates/component-scss.hbs",
        },
      ];
    },
  });
  // Setting up Plop to generate components
  // When run `npm run plop` you'll be asked to enter the component name.
  plop.setGenerator("c", {
    description: "Create a component",
    prompts: [
      {
        type: "input",
        name: "name",
        message: 'Name of the component (e.g., "MyComponent"):',
      },
      {
        type: "input",
        name: "directory",
        message: 'Directory name for your component (e.g., "components"):',
      },
    ],
    actions: (data) => {
      const { directory } = data;
      const currentDirectory = process.cwd();

      const path = directory
        ? `${directory}/{{name}}/{{name}}.tsx`
        : `${currentDirectory}/{{name}}/{{name}}.tsx`;
      const pathStyle = directory
        ? `${directory}/{{name}}/{{name}}.scss`
        : `${currentDirectory}/{{name}}/{{name}}.scss`

      return [
        {
          type: "add",
          path,
          templateFile: "plop-templates/component.hbs",
        },
        {
          type: "add",
          path: pathStyle,
          templateFile: "plop-templates/component-scss.hbs",
        },
      ];
    },
  });
};
