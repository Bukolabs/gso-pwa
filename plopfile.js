module.exports = (plop) => {
  // ./plopfile.js
  // Setting up Plop to generate domains
  // When run `npm run plop` you'll be asked to enter the domain name.
  plop.setGenerator("core", {
    description: "Create a core",
    prompts: [
      {
        type: "input",
        name: "name",
        message: 'Core name (e.g., "user-management"):',
      },
      {
        type: "list",
        name: "category",
        message: "Select the category:",
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
      const { name, category } = data;

      return [
        {
          type: "add",
          path: `src/core/${category}/${name}/${name}.tsx`,
          templateFile: "plop-templates/component.hbs",
        },
        {
          type: "add",
          path: `src/core/${category}/${name}/${name}.scss`,
          templateFile: "plop-templates/component-scss.hbs",
        },
      ];
    },
  });
  // Setting up Plop to generate domains
  // When run `npm run plop` you'll be asked to enter the domain name.
  plop.setGenerator("domain", {
    description: "Create a domain",
    prompts: [
      {
        type: "input",
        name: "domain",
        message: 'Domain name (e.g., "user-management"):',
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
      {
        type: "input",
        name: "name",
        message: 'Name of the component (e.g., "List" or "Table"):',
      },
    ],
    actions: (data) => {
      const { domain, category, name, isRoot } = data;

      const filename = !!name ? name : domain;
      if (isRoot) {
        return [
          {
            type: "add",
            path: `src/domain/${domain}/${filename}.tsx`,
            templateFile: "plop-templates/component.hbs",
          },
          {
            type: "add",
            path: `src/domain/${domain}/${filename}.scss`,
            templateFile: "plop-templates/component-scss.hbs",
          },
        ];
      } else {
        return [
          {
            type: "add",
            path: `src/domain/${domain}/${category}/${filename}/${filename}.tsx`,
            templateFile: "plop-templates/component.hbs",
          },
          {
            type: "add",
            path: `src/domain/${domain}/${category}/${filename}/${filename}.scss`,
            templateFile: "plop-templates/component-scss.hbs",
          },
        ];
      }
    },
  });
  // Setting up Plop to generate components
  // When run `npm run plop` you'll be asked to enter the component name.
  plop.setGenerator("component", {
    description: "Create a component",
    prompts: [
      {
        type: "input",
        name: "directory",
        message: 'Directory name for your component (e.g., "components"):',
      },
      {
        type: "input",
        name: "name",
        message: 'Name of the component (e.g., "MyComponent"):',
      },
    ],
    actions: [
      {
        type: "add",
        path: "./src/{{directory}}/{{name}}/{{name}}.tsx",
        templateFile: "plop-templates/component.hbs",
      },
      {
        type: "add",
        path: "./src/{{directory}}/{{name}}/{{name}}.scss",
        templateFile: "plop-templates/component-scss.hbs",
      },
    ],
  });
};
