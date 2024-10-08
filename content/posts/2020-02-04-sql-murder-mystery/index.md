+++
title = "SQL Murder Mystery"
description = ""
date = "2020-02-04 12:12:24"
draft = false

[extra]
author = "tjmaynes"
+++
Normally when learning a new programming language, library, or concept, I'll fire up an editor and write a set of tests to drive out the knowledge that I am seeking. For a while now, I've wanted to learn more SQL but haven't made time to do so. Luckily this game, called SQL Murder Mystery, showed up on Hackernews one cold winter morning.

SQL Murder Mystery utilizes your SQL querying abilities to solve a "whodunnit" murder mystery with only a single clue to start from. To solve these problems you'll need to write SQLite queries, which I have some decent CRUD knowledge of, as it is the SQL language of choice for the game. I had a lot of fun playing this game and wish more games like this were created for developers.

Below are the SQLite queries I used to solve the Murder Mystery game.

### Solutions

Finding the Report query:
```sql   
select
  crime_scene_report.description
from crime_scene_report
where
  date = 20180115
  and city = "SQL City"
  and type = "murder"
```

Results:
```markdown
| description |
| Security footage shows that there were 2 witnesses. The first witness lives at the last house on "Northwestern Dr". The second witness, named Annabel, lives somewhere on "Franklin Ave". |
```

Finding Morty query:

```sql
select
  person.name,
  interview.transcript
from person
inner join drivers_license on person.license_id=drivers_license.id
inner join interview on person.id=interview.person_id
where person.address_street_name = "Northwestern Dr"
order by person.address_number desc
limit 1
```

Results:
```markdown
| name | transcript |
| Morty Schapiro | I heard a gunshot and then saw a man run out. He had a "Get Fit Now Gym" bag. The membership number on the bag started with "48Z". Only gold members have those bags. The man got into a car with a plate that included "H42W". |
```

Finding Annabel query

```sql
select
  person.name,
  interview.transcript
from person
inner join drivers_license on person.license_id=drivers_license.id
inner join interview on person.id=interview.person_id
inner join get_fit_now_member on person.id=get_fit_now_member.person_id
where person.name like "Annabel%" and person.address_street_name = "Franklin Ave"
```

Results:
```markdown
| name | transcript |
| Annabel Miller | I saw the murder happen, and I recognized the killer from my gym when I was working out last week on January the 9th. |
```

Finding the suspect query:

```sql
select
  person.name,
  interview.transcript
from get_fit_now_check_in
inner join get_fit_now_member on get_fit_now_check_in.membership_id=get_fit_now_member.id
inner join person on get_fit_now_member.person_id=person.id
inner join drivers_license on drivers_license.id=person.license_id
inner join interview on interview.person_id=person.id
where
  get_fit_now_check_in.check_in_date = 20180109
  and get_fit_now_check_in.membership_id like "%48Z%"
  and drivers_license.plate_number like "%H42W%"
order by get_fit_now_check_in.check_in_time desc
```

Results:
```markdown
| name | transcript |
| Jeremy Bowers | I was hired by a woman with a lot of money. I don't know her name but I know she's around 5'5" (65") or 5'7" (67"). She has red hair and she drives a Tesla Model S. I know that she attended the SQL Symphony Concert 3 times in December 2017. |
```

Finding the real perp query

```sql
select
  person.name
from drivers_license
inner join person on person.license_id=drivers_license.id
inner join facebook_event_checkin on facebook_event_checkin.person_id=person.id
where
  height between 65 and 67
  and hair_color = "red"
  and car_make   = "Tesla"
  and car_model  = "Model S"
limit 1
```

Results:
```markdown
| name |
| Miranda Priestly |
```
