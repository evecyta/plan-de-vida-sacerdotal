import Colors from "./colors";

const Typography = {

  hero: {

    fontSize: 34,

    fontWeight: "700" as const,

    color: Colors.text,

  },

  title: {

    fontSize: 24,

    fontWeight: "700" as const,

    color: Colors.text,

  },

  subtitle: {

    fontSize: 18,

    fontWeight: "600" as const,

    color: Colors.text,

  },

  body: {

    fontSize: 16,

    color: Colors.text,

  },

  button: {

    fontSize: 16,

    fontWeight: "700" as const,

    letterSpacing: 0.2,

    color: Colors.white,

  },

  label: {

    fontSize: 15,

    fontWeight: "600" as const,

    color: Colors.text,

  },

  caption: {

    fontSize: 13,

    color: Colors.textSecondary,

  },

};

export default Typography;