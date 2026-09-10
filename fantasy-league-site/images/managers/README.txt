Manager Photos
===============

Drop a photo for each manager in this folder as a .jpg, named like this
(lowercase, spaces replaced with hyphens):

  adam-kahler.jpg
  adam-schon.jpg
  austin-gauss.jpg
  ben-schon.jpg
  blake-beachnau.jpg
  bobby-mowry.jpg
  brent-hurlburt.jpg
  evan-lamb.jpg
  jack-callahan.jpg
  jacob-ayriss.jpg
  jon-hurlburt.jpg
  zach-crook.jpg
  zack-rollis.jpg

No code changes needed -- the Managers page picks up a matching filename
automatically. A roughly square photo works best since it's cropped into
a circle. Any manager without a file just keeps their colored-initials
avatar, so you can add these gradually.

Note: the filename must match exactly, including a lowercase ".jpg"
extension -- a file saved as ".JPG" or ".jpeg" won't be picked up, since
the site's hosting is case-sensitive even though it may still open fine
if you preview it locally on a Mac.

Heads up on Ben Schon specifically: the Managers page (js/records.js)
lists him as "Ben Schon", but other pages on this site (drafts, trades,
recap) list the same person as "Benjamin Schon". The photo filename
always follows whatever name js/records.js uses for that page, so his
file is "ben-schon.jpg" even though he shows up as "Benjamin Schon"
elsewhere on the site. This inconsistency predates the photo feature --
worth reconciling site-wide at some point, but not required for photos
to work.

This file is just a placeholder to create the folder and isn't used by
the site -- delete it whenever you like.
