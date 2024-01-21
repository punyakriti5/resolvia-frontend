import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  AccordionActions,
  Button,
  Container,
  Typography,
  Stack,
} from "@mui/material";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import React from "react";

function MyResolveComp() {
  return (
    <>
      <Container sx={{ mt: 10 }}>
        <Stack spacing={2}>
          <Typography
            variant="body1"
            color="text.primary"
            sx={{
              textAlign: "center",
              textTransform: "capitalize",
              fontWeight: "medium",
              borderBottom: 1,
            }}
          >
            My Resolves
          </Typography>

          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              My navigator.virtualKeyboard not working
            </AccordionSummary>
            <AccordionDetails>
              My webpage that used navigator.virtualKeyboard is not working
              anymore. Did I miss the memo, have they removed the virtual
              keyboard api? I have exactly 2 devices available for testing,
              neither have . They both used to work fine. Can anyone confirm if
              virtual keyboard api has changed?
            </AccordionDetails>
            <AccordionActions>
              <Button variant="contained" sx={{ height: 30 }}>
                learn more
              </Button>
            </AccordionActions>
          </Accordion>

          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              My navigator.virtualKeyboard not working
            </AccordionSummary>
            <AccordionDetails>
              My webpage that used navigator.virtualKeyboard is not working
              anymore. Did I miss the memo, have they removed the virtual
              keyboard api? I have exactly 2 devices available for testing,
              neither have the (virtualKeyboard in navigator). They both used to
              work fine.Can anyone confirm if virtual keyboard api has changed?
            </AccordionDetails>
            <AccordionActions>
              <Button variant="contained" sx={{ height: 30 }}>
                learn more
              </Button>
            </AccordionActions>
          </Accordion>

          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              My navigator.virtualKeyboard not working
            </AccordionSummary>
            <AccordionDetails>
              My webpage that used navigator.virtualKeyboard is not working
              anymore. Did I miss the memo, have they removed the virtual
              keyboard api? I have exactly 2 devices available for testing,
              neither have the (virtualKeyboard in navigator). They both used to
              work fine. Can anyone confirm if virtual keyboard api has changed?
            </AccordionDetails>
            <AccordionActions>
              <Button variant="contained" sx={{ height: 30 }}>
                learn more
              </Button>
            </AccordionActions>
          </Accordion>
        </Stack>
      </Container>
    </>
  );
}

export default MyResolveComp;
