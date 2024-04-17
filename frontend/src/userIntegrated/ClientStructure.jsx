const clientStructure = [
  {
    name: "name",
    fields: [
      {
        name: "first",
        type: "text",
        label: "שם פרטי",
        required: true,
        block: false,
      },
      {
        name: "middle",
        type: "text",
        label: "שם אמצעי",
        required: true,
        block: false,
      },
      {
        name: "last",
        type: "text",
        label: "שם משפחה",
        required: true,
        block: false,
      },
    ],
  },
  { name: "phone", type: "text", label: "נייד", required: true, block: false },
  {
    name: "email",
    type: "email",
    label: "איימל",
    required: true,
    block: false,
  },
  {
    name: "password",
    type: "password",
    label: "סיסמא",
    required: true,
    block: false,
    initialOnly: true,
  },
  {
    name: "image",
    fields: [
      {
        name: "url",
        type: "text",
        label: "צרף תמונת אינטרנט",
        required: true,
        block: true,
      },
      {
        name: "alt",
        type: "text",
        label: "תיאור התמונה",
        required: true,
        block: false,
      },
    ],
  },
    {
    name: "teamName",
    type: "text",
    label: "שם הצוות",
    required: true,
    block: false,
  },
  {
    name: "IsBusiness",
    type: "boolean",
    label: "ראש צוות",
    required: true,
    block: false,
  },
    {
    name: "serviceDepartment",
    type: "boolean",
    label: "מוקד שירות",
    required: true,
    block: false,
  },
    {
    name: "conservationDepartment",
    type: "boolean",
    label: "מוקד שימור",
    required: true,
    block: false,
  },
];

export default clientStructure;