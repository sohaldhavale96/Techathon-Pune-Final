import { Box, Typography, Accordion, AccordionDetails, AccordionSummary } from '@mui/joy';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import './faq.css';

const faqs = [
  {
    question: "How does food donation work on MealConnect?",
    answer: "MealConnect makes food donation simple. Restaurants and food businesses can register, list their surplus food, and our platform connects them with nearby NGOs and food banks. We ensure safe food handling and timely pickup/delivery."
  },
  {
    question: "What types of food can be donated?",
    answer: "We accept non-perishable foods, fresh produce, prepared meals, and packaged foods that are still safe for consumption. All donations must meet food safety guidelines and be within their consumption timeframe."
  },
  {
    question: "How do you ensure food safety?",
    answer: "We follow strict food safety protocols. All donors must comply with food safety guidelines, and our NGO partners are trained in proper food handling. We monitor temperature control and delivery timing to maintain food quality."
  },
  {
    question: "Can individuals donate food?",
    answer: "Currently, we primarily work with businesses and organizations to ensure consistent food quality and quantity. However, individuals can support our mission through volunteering or financial contributions."
  },
  {
    question: "How can NGOs partner with MealConnect?",
    answer: "NGOs can apply through our website. We verify credentials, assess food handling capabilities, and provide training. Once approved, NGOs can access our platform to receive food donations."
  },
  {
    question: "What areas do you currently serve?",
    answer: "We currently operate in major cities across Maharashtra, with plans to expand to other regions. Check our coverage area page for specific locations and expansion updates."
  }
];

function FaqSection() {
  return (
    <Box
      sx={{
        py: 8,
        px: { xs: 2, md: 6 },
        backgroundColor: '#f8f9fa', // Light background color
      }}
    >
      <Typography
        level="h2"
        sx={{
          textAlign: 'center',
          mb: 1,
          fontSize: { xs: '1.75rem', md: '2.5rem' },
          fontWeight: 'bold',
          color: 'primary.main'
        }}
      >
        FAQs
      </Typography>
      
      <Typography
        level="h1"
        sx={{
          textAlign: 'center',
          mb: 1,
          fontSize: { xs: '2rem', md: '3rem' },
          fontWeight: 'bold'
        }}
      >
        Questions? Look here.
      </Typography>

      <Box
        sx={{
          maxWidth: '800px',
          mx: 'auto',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        {faqs.map((faq, index) => (
          <Accordion
            key={index}
            sx={{
              border: '1px solid #e0e0e0', // Dark border
              borderRadius: '8px',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', // Subtle shadow
              bgcolor: 'background.surface', // Bluish background
              '&:hover': {
                bgcolor: '#e3f2fd', // Slightly darker on hover
                transition: 'background-color 0.3s ease' // Smooth transition
              }
            }}
          >
            <AccordionSummary
              indicator={({ expanded }) => 
                expanded? <RemoveIcon />: <AddIcon />
              }
              sx={{
                '&:hover': { bgcolor: 'background.level1' },
              }}
            >
              <Typography level="title-lg">
                {faq.question}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography level="body-md">
                {faq.answer}
              </Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    </Box>
  );
}

export default FaqSection;