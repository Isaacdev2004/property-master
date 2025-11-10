import Odoo from "async-odoo-xmlrpc";

interface OdooConfig {
  url: string;
  db: string;
  username: string;
  password: string;
}

class OdooService {
  private client: Odoo | null = null;
  private isConfigured: boolean = false;

  constructor() {
    this.initialize();
  }

  private initialize() {
    const url = process.env.ODOO_URL;
    const db = process.env.ODOO_DB;
    const username = process.env.ODOO_USERNAME;
    const password = process.env.ODOO_API_KEY;

    if (url && db && username && password) {
      try {
        this.client = new Odoo({
          url,
          port: 443,
          db,
          username,
          password,
        });
        this.isConfigured = true;
        console.log("Odoo integration configured successfully");
      } catch (error) {
        console.error("Failed to initialize Odoo client:", error);
        this.isConfigured = false;
      }
    } else {
      console.log("Odoo credentials not configured. Integration will be skipped.");
      this.isConfigured = false;
    }
  }

  async createLead(data: {
    name: string;
    email: string;
    phone: string;
    description: string;
    type?: string;
  }): Promise<{ success: boolean; leadId?: number; error?: string }> {
    if (!this.isConfigured || !this.client) {
      console.log("Odoo not configured. Skipping lead creation.");
      return { success: false, error: "Odoo not configured" };
    }

    try {
      await this.client.connect();

      const leadData = {
        name: data.name,
        email_from: data.email,
        phone: data.phone,
        description: data.description,
        type: data.type || "opportunity",
        tag_ids: [[6, 0, []]],
      };

      const leadId = await this.client.execute_kw("crm.lead", "create", [[leadData]]);
      
      console.log(`Successfully created Odoo lead with ID: ${leadId}`);
      return { success: true, leadId };
    } catch (error) {
      console.error("Error creating Odoo lead:", error);
      return { success: false, error: error instanceof Error ? error.message : "Unknown error" };
    }
  }

  async createPartner(data: {
    name: string;
    email: string;
    phone: string;
    street?: string;
    city?: string;
  }): Promise<{ success: boolean; partnerId?: number; error?: string }> {
    if (!this.isConfigured || !this.client) {
      console.log("Odoo not configured. Skipping partner creation.");
      return { success: false, error: "Odoo not configured" };
    }

    try {
      await this.client.connect();

      const partnerData = {
        name: data.name,
        email: data.email,
        phone: data.phone,
        street: data.street || "",
        city: data.city || "",
        is_company: false,
        customer_rank: 1,
      };

      const partnerId = await this.client.execute_kw("res.partner", "create", [[partnerData]]);
      
      console.log(`Successfully created Odoo partner with ID: ${partnerId}`);
      return { success: true, partnerId };
    } catch (error) {
      console.error("Error creating Odoo partner:", error);
      return { success: false, error: error instanceof Error ? error.message : "Unknown error" };
    }
  }

  isAvailable(): boolean {
    return this.isConfigured;
  }
}

export const odooService = new OdooService();
