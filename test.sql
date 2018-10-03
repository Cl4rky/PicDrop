update APUserGLOBAL set password = Changeme(), SALT = NULL where defaultcompanycode=‘NATHANGRACE1’ ;
commit;
update ASUSER set password = Changeme(), SALT = NULL where defaultInstance=‘NATHANGRACE1’;
commit;
UPDATE Company SET buildnumber = (SELECT BuildNumber FROM Company WHERE Code=‘DCNT’) WHERE Code=‘NATHANGRACE1’ ;
commit;