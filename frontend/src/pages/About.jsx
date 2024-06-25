import "../styles/CreateCards.css";
import "../styles/About.css";
import { Box, Typography, List, ListItem, ListItemText } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";

export default function About(theme) {
  return (
    <>
      {
        <ThemeProvider theme={theme}>
          <Box component="div" className="containerAbout">
            <Typography component="div" variant="h3" className="tempTitle">
              <div>הדרכה קצרה</div>
            </Typography>
            <Typography variant="h1">DataInsight</Typography>
            <br />
            <Typography
              component="div"
              variant="body1"
              className="containerAboutText">
              <div>
                אנחנו עמידה ביעדים במוקדי טלפונים דורשת ארגון, יכולת ניהול זמן
                ויכולת להתמודד עם לחצים. חשוב להיות אקטיבי, להתמקד במטרות
                העיקריות ולתת פתרונות מהירים. נדרשת יכולת תקשורת מעולה, הבנת
                הלקוח ויכולת להפנים ביעילות. חשוב להיות אמפתיים ומקצועיים גם
                בזמנים מאתגרים. להתקשר לקוחות במטרה להשיג מטרות עסקיות מוסכמות,
                תוך שמירה על איכות השירות והיחס האדיב. עליך להיות גם גמיש, יציב
                ומוכן ללמוד ולהתאים עצמך לצרכי הלקוחות.
              </div>
            </Typography>
            <br />
            <Typography
              className="tempTitle"
              component="div"
              variant="h4"
              style={{ direction: "ltr" }}>
              ? אז מה בעצם המערכת שלנו יכולה לעשות
            </Typography>
            <br />
            <Typography
              component="div"
              variant="body1"
              className="containerAboutText">
              <div>
                יישום הנתונים מארגן ביעילות מדדי פרודוקטיביות עובדים, מתן תובנות
                מפורטות ברמה פרטנית לפי חודש ויום. פילוח זה מאפשר ניתוח יסודי,
                ומציע נראות מראשי צוותים ועד מנהלי מרכז. על ידי מעקב אחר ביצועים
                יומיים, מנהיגים יכולים לעקוב אחר מסלול ההתקדמות של כל עובד,
                זיהוי אזורים לשיפור וזיהוי ביצועים גבוהים באופן מיידי. זה מקל על
                קבלת החלטות מונעת נתונים, טיפוח מצוינות במקום העבודה
                ואופטימיזציה של היעילות. כלי מקצועי זה הוא בעל ערך רב עבור
                ארגונים השואפים לפרודוקטיביות ולהצלחה.
              </div>
            </Typography>
            <Typography variant="h2" style={{ direction: "ltr" }}>
              <div>? ואיך משתמשים ומי</div>
            </Typography>
            <br />
            <Box
              className="whoCan"
              style={{ textAlign: "justify", direction: "ltr", margin: "2px" }}>
              <List>
                <ListItem>
                  <ListItemText
                    component="div"
                    variant="body1"
                    primary="Agent/User :"
                    secondary="תפקידו של הנציג/סוכן כרוך בעדכוני נתונים יומיים, חתירה לשיפור. הם עוקבים אחר נפחי שיחות, ניתוקים ומכירות מדי יום, ומנתחים הצטברויות חודשיות כדי להעריך את הביצועים מול יעדים שנקבעו."
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    component="div"
                    variant="body1"
                    primary="Business/TeamLeader :"
                    secondary="תחומי האחריות של מנהיג הצוות כוללים הנחייה, הנעה ופיקוח על חברי הצוות, הבטחת פרודוקטיביות והשגת יעדים. הם עוקבים אחר נתוני פרודוקטיביות ומנתחים את התוצאות כדי להבין אילו צעדים יש לנקוט כדי לשפר את הביצועים."
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    component="div"
                    variant="body1"
                    primary="Admin/CenterManger :"
                    secondary="המנהל המערכתי עוקב אחר נתוני המערכת ומנתח את המידע כדי להבין אילו צעדים יש לנקוט כדי לשפר את הביצועים. הוא יכול להוסיף ולעדכן משתמשים, להגדיר יעדים ולהגדיר תפקידים."
                  />
                </ListItem>
              </List>
            </Box>
          </Box>
        </ThemeProvider>
      }
    </>
  );
}
